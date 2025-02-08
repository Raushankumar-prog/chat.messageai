export function parseMarkdown(markdown) {
  if (!markdown) return "";

  let counter = 0; // Counter for ordered lists

  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, `<h3 class="text-lg font-semibold mt-3 mb-2">$1</h3>`)
    .replace(/^## (.*$)/gim, `<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>`)
    .replace(/^# (.*$)/gim, `<h1 class="text-2xl font-extrabold mt-5 mb-3">$1</h1>`)

    // Bold (**bold**)
    .replace(/\*\*(.*?)\*\*/gim, `<b class="font-bold">$1</b>`)

    // Italics (*italic*) - FIXED!
    .replace(/(?<!\*)\*(?!\*)([^\s][^*]*?[^\s])\*(?!=\*)/gim, `<i class="italic">$1</i>`)

    // Inline Code (`code`) - FIXED!
    .replace(/`([^`]+)`/gim, `<code class="bg-gray-200 text-red-600 px-2 py-1 rounded text-sm font-mono border border-gray-400">$1</code>`)

    // Code Blocks (```code```)
    .replace(/```([\s\S]*?)```/gim, (match, p1) => {
      const codeContent = p1.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `
        <div class="relative bg-gray-800 text-white p-3 rounded-md my-3">
      
          <pre><code class="whitespace-pre-wrap">${codeContent}</code></pre>
        </div>`;
    })

    // Blockquotes (> text)
    .replace(/^> (.*$)/gim, `<blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-700">$1</blockquote>`)

    // Horizontal Rules (---, ***, ___)
    .replace(/^\s*[-*_]{3,}\s*$/gim, `<hr class="border-t-2 border-gray-300 my-4" />`)

    // Convert Unordered Lists (*) to Ordered Lists (1., 2., 3.)
    .replace(/^\s*\*\s(.*$)/gim, (match, p1, offset, string) => {
      counter++; // Increment counter
      return `<li class="list-decimal ml-5">${counter}. ${p1}</li>`;
    })
    .replace(/(<li class="list-decimal ml-5">.*<\/li>)/gim, `<ol class="list-outside ml-4 space-y-1">$1</ol>`)

    // Preserve Line Breaks
    .replace(/\n/g, "<br />");

  return html;
}
