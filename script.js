const sampleMarkdown = `# Modern Frontend Architecture in 2026

Welcome to the **Markdown-Based Tech Blog**! This application demonstrates rendering rich Markdown content purely on the frontend with custom dark mode styling and syntax highlighting.

---

## Key Technical Features

Here are some highlights of our modern static stack:

- **Zero-Backend Architecture**: Hosted easily via Nginx or CDN.
- **Client-Side Rendering**: Fast compilation powered by [Marked.js](https://marked.js.org/).
- **Syntax Highlighting**: Beautiful code blocks courtesy of [Highlight.js](https://highlightjs.org/).
- **Responsive Layout**: Split view for desktop, stacked layout for mobile devices.

---

## Code Example: Pure JavaScript Markdown Renderer

Below is a clean snippet showing how easy it is to handle real-time Markdown rendering:

\`\`\`javascript
const markdownInput = document.getElementById('markdown-input');
const previewOutput = document.getElementById('preview-output');

// Configure marked with syntax highlighting
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true
});

markdownInput.addEventListener('input', () => {
  previewOutput.innerHTML = marked.parse(markdownInput.value);
});
\`\`\`

---

## Benchmark & Performance Comparison

| Technology | Rendering Location | Server Load | Deployment Ease |
| :--- | :--- | :--- | :--- |
| **Pure Static (This App)** | Client Browser | Zero | Very High |
| **Node.js SSR** | Server | Moderate | Medium |
| **Traditional CMS** | Server + DB | High | Low |

---

## Architecture Insights

> "Static sites paired with client-side enhancements represent the peak of speed, simplicity, and security for developer blogs."

### Quick Checklist for Deployment
1. Put files into \`/usr/share/nginx/html\`
2. Configure basic static headers
3. Enjoy blazingly fast load speeds!

Try editing the text on the left to see the live updates!
`;

document.addEventListener('DOMContentLoaded', () => {
  const markdownInput = document.getElementById('markdown-input');
  const previewOutput = document.getElementById('preview-output');
  const wordCountDisplay = document.getElementById('word-count');
  const copyHtmlBtn = document.getElementById('copy-html-btn');
  const clearBtn = document.getElementById('clear-btn');

  // Configure marked.js options with syntax highlighting
  if (typeof marked !== 'undefined') {
    marked.setOptions({
      highlight: function(code, lang) {
        if (typeof hljs !== 'undefined') {
          if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
          }
          return hljs.highlightAuto(code).value;
        }
        return code;
      },
      breaks: true,
      gfm: true
    });
  }

  function updatePreview() {
    const rawText = markdownInput.value;
    
    // Render Markdown to HTML
    if (typeof marked !== 'undefined') {
      previewOutput.innerHTML = marked.parse(rawText);
    } else {
      previewOutput.textContent = rawText;
    }

    // Apply syntax highlighting to code blocks explicitly
    if (typeof hljs !== 'undefined') {
      previewOutput.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }

    // Update word and character counts
    updateStats(rawText);
  }

  function updateStats(text) {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    wordCountDisplay.textContent = `${words} word${words !== 1 ? 's' : ''} | ${chars} char${chars !== 1 ? 's' : ''}`;
  }

  // Event Listeners
  markdownInput.addEventListener('input', updatePreview);

  copyHtmlBtn.addEventListener('click', () => {
    const htmlContent = previewOutput.innerHTML;
    navigator.clipboard.writeText(htmlContent).then(() => {
      const originalText = copyHtmlBtn.textContent;
      copyHtmlBtn.textContent = 'Copied!';
      copyHtmlBtn.style.backgroundColor = 'var(--success-color)';
      setTimeout(() => {
        copyHtmlBtn.textContent = originalText;
        copyHtmlBtn.style.backgroundColor = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the editor?')) {
      markdownInput.value = '';
      updatePreview();
    }
  });

  // Load initial sample markdown
  markdownInput.value = sampleMarkdown;
  updatePreview();
});
