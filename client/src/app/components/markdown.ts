function generateCodeBlock(codeContent: string) {
  return `
    <div class="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-4 rounded-xl my-1 shadow-xl border border-gray-700 
            hover:shadow-2xl hover:scale-[1.04] transition-transform duration-300 ease-in-out group overflow-hidden">
    
      <!-- Code container -->
      <pre class="overflow-x-auto p-3 rounded-lg bg-gray-950/80 border border-gray-700 shadow-md">
          <code class="whitespace-pre-wrap font-mono text-sm block">${codeContent}</code>
      </pre>

      <!-- Floating gradient highlight -->
      <div class="absolute -top-2 -left-12 w-24 h-20 bg-purple-500/20 rounded-full blur-3xl opacity-50"></div>
      <div class="absolute -bottom-5 -right-12 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl opacity-50"></div>
    </div>
  `;
}

export function parseMarkdown(markdown: string) {
  if (!markdown) return "";

  let html = markdown
    // Headers
    .replace(/^### (.*)$/gm, `<h3 class="text-lg font-semibold mt-3 mb-2">$1</h3>`)
    .replace(/^## (.*)$/gm, `<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>`)
    .replace(/^# (.*)$/gm, `<h1 class="text-2xl font-extrabold mt-5 mb-3">$1</h1>`)

    // Bold (**bold**)
    .replace(/\*\*(.*?)\*\*/g, `<b class="font-bold">$1</b>`)

    // Italics (*italic*)
    .replace(/(?<!\*)\*(?!\*)([^\s][^*]*?[^\s])\*(?!\*)/g, `<i class="italic">$1</i>`)

    // Code Blocks (```)
    .replace(/```([\s\S]*?)```/g, (match, p1) => {
      const codeContent = p1.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return generateCodeBlock(codeContent);
    })

    //inline code
  .replace(/`(\S[^`]*\S)`/g, `<code class="bg-gray-700 text-gray-200 px-2 py-1 rounded text-sm font-mono border border-gray-600">$1</code>`)

  

  


    // Blockquotes (> text)
    .replace(/^> (.*)$/gm, `<blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-400">$1</blockquote>`)

    // Horizontal Rules (---, ***, ___)
    .replace(/^\s*[-*_]{3,}\s*$/gm, `<hr class="border-t-2 border-gray-300 my-4" />`)


    
.replace(/^\s*[*+-]\s(.*)$/gm, `<li class="ml-5 list-disc">$1</li>`)
.replace(/(?:<li class="ml-5 list-disc">.*<\/li>\n?)+/g, (match) => {
  return `<ul class="list-outside ml-4 space-y-1">${match}</ul>`;
})
.replace(/^\s*\d+\.\s(.*)$/gm, `<li class="ml-5 list-decimal">$1</li>`)
.replace(/(?:<li class="ml-5 list-decimal">.*<\/li>\n?)+/g, (match) => {
  return `<ol class="list-outside ml-4 space-y-1">${match}</ol>`;
})




.replace(/(<li class="ml-5 list-decimal">)(.*)(<\/li>)/g, `$1<p class="inline-block">$2</p>$3`)



    // Preserve Line Breaks
.replace(/\n(?!\d+\.|[*+-])(?=\S)(?!<\/?code>)/g, "<br />")



  return html;
}