import { Link } from "react-router-dom";

const pdfTools = [
  { name: "Merge PDF", url: "/merge-pdf" },
  { name: "Split PDF", url: "/split-pdf" },
  { name: "Compress PDF", url: "/compress-pdf" },
  { name: "Rotate PDF", url: "/rotate-pdf" },
  { name: "PDF to JPG", url: "/pdf-to-jpg" },
  { name: "JPG to PDF", url: "/jpg-to-pdf" },
  { name: "Watermark PDF", url: "/add-watermark-pdf" },
  { name: "Protect PDF", url: "/protect-pdf" },
  { name: "Unlock PDF", url: "/unlock-pdf" },
  { name: "Page Numbers", url: "/add-page-numbers-pdf" },
  { name: "Remove Pages", url: "/remove-pages-pdf" },
  { name: "Flatten PDF", url: "/flatten-pdf" },
  { name: "Grayscale PDF", url: "/grayscale-pdf" },
  { name: "PDF Metadata", url: "/edit-pdf-metadata" },
  { name: "Stamp PDF", url: "/stamp-pdf" },
  { name: "Repair PDF", url: "/repair-pdf" },
];

const imageTools = [
  { name: "Compress Image", url: "/compress-image" },
  { name: "Resize Image", url: "/resize-image" },
  { name: "Convert Image", url: "/convert-image" },
];

const resources = [
  { name: "All PDF Tools", url: "/pdf-tools" },
  { name: "Image Tools", url: "/media-tools" },
  { name: "AI Content Writer", url: "/content-studio" },
  { name: "AI File Manager", url: "/file-brain" },
  { name: "Blog", url: "/blog" },
];

const popularBlogs = [
  { name: "How to Merge PDF Online Free", url: "/blog/how-to-merge-pdf-online-free" },
  { name: "Compress PDF — Reduce File Size", url: "/blog/compress-pdf-reduce-size" },
  { name: "Best Free AI Tools 2026", url: "/blog/best-free-ai-tools-2026" },
  { name: "Free PDF Tools Guide", url: "/blog/free-pdf-tools-online-guide" },
  { name: "Image Compression Guide", url: "/blog/image-compression-resize-guide" },
  { name: "How to Split PDF Pages", url: "/blog/how-to-split-pdf-pages" },
];

export function SEOFooter() {
  return (
    <footer className="bg-card border-t border-border mt-4 pt-8 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Brand */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">PineToolsHub</h2>
          <p className="text-muted-foreground max-w-xl text-sm">
            30+ free online tools for PDF processing, image editing, and AI-powered productivity. 
            100% browser-based, no signup required, no ads. Trusted by thousands of users worldwide.
          </p>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">PDF Tools</h3>
            <ul className="space-y-2">
              {pdfTools.slice(0, 8).map((tool) => (
                <li key={tool.url}>
                  <Link to={tool.url} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">More PDF Tools</h3>
            <ul className="space-y-2">
              {pdfTools.slice(8).map((tool) => (
                <li key={tool.url}>
                  <Link to={tool.url} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Image Tools</h3>
            <ul className="space-y-2">
              {imageTools.map((tool) => (
                <li key={tool.url}>
                  <Link to={tool.url} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item.url}>
                  <Link to={item.url} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Popular Guides</h3>
            <ul className="space-y-2">
              {popularBlogs.map((blog) => (
                <li key={blog.url}>
                  <Link to={blog.url} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {blog.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO Paragraph */}
        <div className="border-t border-border pt-6 mb-6">
          <p className="text-muted-foreground text-xs leading-relaxed max-w-4xl">
            PineToolsHub is a free online productivity suite offering PDF tools (merge PDF, split PDF, compress PDF, rotate PDF, 
            add watermark to PDF, password protect PDF, unlock PDF, PDF to JPG converter, JPG to PDF converter, add page numbers, 
            remove pages, flatten PDF, grayscale PDF, edit PDF metadata, stamp PDF, repair PDF), image tools (compress image, 
            resize image, convert image format), AI content writer, and AI file manager. All tools work directly in your browser 
            — no software installation, no file uploads to external servers, no registration required. Your files stay on your 
            device for complete privacy and security. Available worldwide, free forever, with no ads.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} PineToolsHub. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/pdf-tools" className="hover:text-primary transition-colors">PDF Tools</Link>
            <Link to="/media-tools" className="hover:text-primary transition-colors">Image Tools</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
