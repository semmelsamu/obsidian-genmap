import extractFrontmatter from "@/utilities/extractFrontmatter";
import extractWikilink from "@/utilities/extractWikilink";

/**
 * Reads every file in the Vault and attempts to extract the relation data.
 */
export default async function parse() {
	return await Promise.all(
		app.vault.getMarkdownFiles().map(async (file: any) => {
			let content = await app.vault.cachedRead(file);

			let frontmatter = extractFrontmatter(content);

			return {
				label: file.basename,
				path: file.path,
				parents: parseItem(frontmatter?.parents),
				children: parseItem(frontmatter?.children),
				siblings: parseItem(frontmatter?.siblings),
			};
		})
	);
}

// Util
function parseItem(item: any): string[] {
	if (!item || !Array.isArray(item)) return [];
	return item.map((parent: string) => extractWikilink(parent));
}
