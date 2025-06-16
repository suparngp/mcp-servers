import Fastify from 'fastify'
import { config } from 'dotenv'
import { getDocsDatabase } from './db/chroma.js'

// Load environment variables
config()

const fastify = Fastify({ logger: true })

// Initialize database
const db = getDocsDatabase(process.env.OPENAI_API_KEY!)

// HTML template for the SPA
const htmlTemplate = () => `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docs</title>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --background: 0 0% 3.9%;
            --foreground: 0 0% 98%;
            --card: 0 0% 3.9%;
            --card-foreground: 0 0% 98%;
            --popover: 0 0% 3.9%;
            --popover-foreground: 0 0% 98%;
            --primary: 0 0% 98%;
            --primary-foreground: 0 0% 9%;
            --secondary: 0 0% 14.9%;
            --secondary-foreground: 0 0% 98%;
            --muted: 0 0% 14.9%;
            --muted-foreground: 0 0% 63.9%;
            --accent: 0 0% 14.9%;
            --accent-foreground: 0 0% 98%;
            --destructive: 0 62.8% 30.6%;
            --destructive-foreground: 0 0% 98%;
            --border: 0 0% 14.9%;
            --input: 0 0% 14.9%;
            --ring: 0 0% 83.1%;
            --radius: 0.5rem;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: hsl(var(--background));
            color: hsl(var(--foreground));
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        /* Header */
        header {
            border-bottom: 1px solid hsl(var(--border));
            backdrop-filter: saturate(180%) blur(10px);
            background: hsla(var(--background), 0.8);
            position: sticky;
            top: 0;
            z-index: 50;
        }
        
        .header-content {
            height: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .logo {
            font-size: 1.125rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            text-decoration: none;
            color: hsl(var(--foreground));
        }
        
        .logo:hover {
            opacity: 0.8;
        }
        
        /* Hero Search */
        .hero {
            padding: 8rem 0 4rem;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(to right, hsl(var(--foreground)), hsl(var(--muted-foreground)));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero p {
            font-size: 1.125rem;
            color: hsl(var(--muted-foreground));
            margin-bottom: 3rem;
        }
        
        /* Search Container */
        .search-wrapper {
            max-width: 42rem;
            margin: 0 auto;
            position: relative;
        }
        
        .search-container {
            position: relative;
            display: flex;
            align-items: center;
            background: hsl(var(--card));
            border: 1px solid hsl(var(--border));
            border-radius: calc(var(--radius) + 0.25rem);
            transition: all 0.2s;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        }
        
        .search-container:focus-within {
            border-color: hsl(var(--ring));
            box-shadow: 0 0 0 3px hsla(var(--ring), 0.1), 0 1px 3px 0 rgb(0 0 0 / 0.1);
        }
        
        .search-icon {
            position: absolute;
            left: 1rem;
            color: hsl(var(--muted-foreground));
            pointer-events: none;
            font-size: 1.25rem;
        }
        
        .search-input {
            flex: 1;
            background: transparent;
            border: none;
            color: hsl(var(--foreground));
            font-size: 1rem;
            padding: 1rem 3rem;
            outline: none;
            font-family: inherit;
        }
        
        .search-input::placeholder {
            color: hsl(var(--muted-foreground));
        }
        
        .clear-button {
            position: absolute;
            right: 12rem;
            background: transparent;
            border: none;
            color: hsl(var(--muted-foreground));
            cursor: pointer;
            padding: 0.5rem;
            font-size: 1.125rem;
            border-radius: var(--radius);
            transition: all 0.2s;
        }
        
        .clear-button:hover {
            background: hsl(var(--secondary));
            color: hsl(var(--foreground));
        }
        
        .search-filters {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding-right: 0.5rem;
        }
        
        /* Custom Select */
        .select-wrapper {
            position: relative;
        }
        
        .select-trigger {
            background: hsl(var(--secondary));
            border: 1px solid hsl(var(--border));
            color: hsl(var(--foreground));
            padding: 0.5rem 2.5rem 0.5rem 1rem;
            border-radius: var(--radius);
            font-size: 0.875rem;
            cursor: pointer;
            outline: none;
            font-family: inherit;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-width: 120px;
            position: relative;
        }
        
        .select-trigger:hover {
            background: hsl(var(--accent));
        }
        
        .select-trigger i {
            position: absolute;
            right: 0.75rem;
            font-size: 1rem;
            transition: transform 0.2s;
        }
        
        .select-dropdown {
            position: absolute;
            top: calc(100% + 0.25rem);
            right: 0;
            background: hsl(var(--popover));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            overflow: hidden;
            z-index: 10;
            min-width: 100%;
        }
        
        .select-option {
            padding: 0.5rem 1rem;
            cursor: pointer;
            transition: background 0.2s;
            font-size: 0.875rem;
        }
        
        .select-option:hover {
            background: hsl(var(--accent));
        }
        
        .select-option.selected {
            background: hsl(var(--secondary));
            font-weight: 500;
        }
        
        .search-button {
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            border: none;
            padding: 0.5rem 1rem;
            border-radius: var(--radius);
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: opacity 0.2s;
            font-family: inherit;
        }
        
        .search-button:hover {
            opacity: 0.9;
        }
        
        /* Loading */
        .loading {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 2px solid hsl(var(--muted));
            border-top-color: hsl(var(--foreground));
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Project Cards */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 3rem;
        }
        
        .project-card {
            background: hsl(var(--card));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            padding: 1.5rem;
            transition: all 0.2s;
            cursor: pointer;
        }
        
        .project-card:hover {
            border-color: hsl(var(--ring));
            transform: translateY(-2px);
            box-shadow: 0 4px 12px 0 rgb(0 0 0 / 0.1);
        }
        
        .project-card h3 {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .project-card p {
            color: hsl(var(--muted-foreground));
            font-size: 0.875rem;
        }
        
        /* Results */
        .results-container {
            max-width: 56rem;
            margin: 0 auto;
            padding: 2rem 0;
        }
        
        .results-header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid hsl(var(--border));
        }
        
        .results-count {
            font-size: 0.875rem;
            color: hsl(var(--muted-foreground));
        }
        
        .result-item {
            background: hsl(var(--card));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            padding: 1.5rem;
            margin-bottom: 1rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .result-item:hover {
            border-color: hsl(var(--ring));
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        }
        
        .result-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.75rem;
        }
        
        .result-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: hsl(var(--foreground));
            margin: 0;
        }
        
        .result-relevance {
            font-size: 0.75rem;
            font-weight: 500;
            padding: 0.25rem 0.5rem;
            background: hsl(var(--secondary));
            color: hsl(var(--secondary-foreground));
            border-radius: calc(var(--radius) - 0.25rem);
        }
        
        .result-url {
            font-size: 0.875rem;
            color: hsl(var(--muted-foreground));
            margin-bottom: 1rem;
        }
        
        .result-content {
            color: hsl(var(--muted-foreground));
            font-size: 0.875rem;
            line-height: 1.6;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        /* Markdown Preview Styles */
        .markdown-preview {
            font-size: 0.875rem;
            line-height: 1.6;
        }
        
        .markdown-preview h1, .markdown-preview h2, .markdown-preview h3 {
            font-size: 1em;
            font-weight: 600;
            display: inline;
        }
        
        .markdown-preview p {
            display: inline;
        }
        
        .markdown-preview code {
            background: hsl(var(--secondary));
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            font-size: 0.8125rem;
        }
        
        /* Modal */
        .modal-backdrop {
            position: fixed;
            inset: 0;
            background: hsla(var(--background), 0.8);
            backdrop-filter: blur(8px);
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        
        .modal {
            background: hsl(var(--card));
            border: 1px solid hsl(var(--border));
            border-radius: calc(var(--radius) + 0.25rem);
            width: 100%;
            max-width: 56rem;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
        }
        
        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid hsl(var(--border));
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0;
        }
        
        .modal-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .toggle-markdown {
            background: hsl(var(--secondary));
            border: 1px solid hsl(var(--border));
            color: hsl(var(--foreground));
            padding: 0.375rem 0.75rem;
            border-radius: var(--radius);
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
            display: flex;
            align-items: center;
            gap: 0.375rem;
        }
        
        .toggle-markdown:hover {
            background: hsl(var(--accent));
        }
        
        .modal-close {
            background: transparent;
            border: 1px solid hsl(var(--border));
            color: hsl(var(--muted-foreground));
            width: 2rem;
            height: 2rem;
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .modal-close:hover {
            background: hsl(var(--secondary));
            color: hsl(var(--foreground));
        }
        
        .modal-body {
            padding: 1.5rem;
            overflow-y: auto;
            flex: 1;
        }
        
        /* Markdown Styles */
        .markdown-content {
            font-size: 0.875rem;
            line-height: 1.75;
            color: hsl(var(--foreground));
        }
        
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .markdown-content h4,
        .markdown-content h5,
        .markdown-content h6 {
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
        }
        
        .markdown-content h1 { font-size: 1.875rem; }
        .markdown-content h2 { font-size: 1.5rem; }
        .markdown-content h3 { font-size: 1.25rem; }
        .markdown-content h4 { font-size: 1.125rem; }
        
        .markdown-content p {
            margin-bottom: 1rem;
        }
        
        .markdown-content pre {
            background: hsl(var(--secondary));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            padding: 1rem;
            overflow-x: auto;
            margin-bottom: 1rem;
            font-size: 0.8125rem;
        }
        
        .markdown-content code {
            background: hsl(var(--secondary));
            padding: 0.125rem 0.375rem;
            border-radius: calc(var(--radius) - 0.25rem);
            font-size: 0.8125rem;
            font-family: 'SF Mono', Monaco, Consolas, monospace;
        }
        
        .markdown-content pre code {
            background: transparent;
            padding: 0;
        }
        
        .markdown-content ul,
        .markdown-content ol {
            margin-bottom: 1rem;
            padding-left: 2rem;
        }
        
        .markdown-content li {
            margin-bottom: 0.25rem;
        }
        
        .markdown-content blockquote {
            border-left: 3px solid hsl(var(--border));
            padding-left: 1rem;
            margin-bottom: 1rem;
            color: hsl(var(--muted-foreground));
        }
        
        .markdown-content a {
            color: hsl(var(--primary));
            text-decoration: underline;
        }
        
        .markdown-content hr {
            border: none;
            border-top: 1px solid hsl(var(--border));
            margin: 2rem 0;
        }
        
        .markdown-content table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
        }
        
        .markdown-content th,
        .markdown-content td {
            border: 1px solid hsl(var(--border));
            padding: 0.5rem;
            text-align: left;
        }
        
        .markdown-content th {
            background: hsl(var(--secondary));
            font-weight: 600;
        }
        
        /* Plain text */
        .plain-content {
            font-family: 'SF Mono', Monaco, Consolas, monospace;
            white-space: pre-wrap;
            font-size: 0.8125rem;
            line-height: 1.6;
            color: hsl(var(--muted-foreground));
        }
        
        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: hsl(var(--muted-foreground));
        }
        
        /* Raw Response */
        .raw-toggle {
            margin-top: 2rem;
            text-align: center;
        }
        
        .raw-button {
            background: transparent;
            border: 1px solid hsl(var(--border));
            color: hsl(var(--muted-foreground));
            padding: 0.5rem 1rem;
            border-radius: var(--radius);
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        }
        
        .raw-button:hover {
            background: hsl(var(--secondary));
            color: hsl(var(--foreground));
        }
        
        .raw-content {
            margin-top: 1rem;
            background: hsl(var(--secondary));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            padding: 1rem;
            font-size: 0.75rem;
            font-family: 'SF Mono', Monaco, Consolas, monospace;
            overflow-x: auto;
            text-align: left;
        }
        
        /* Utilities */
        [x-cloak] { display: none !important; }
    </style>
</head>
<body x-data="docsApp()">
    <!-- Header -->
    <header>
        <div class="container">
            <div class="header-content">
                <a href="#" class="logo" @click.prevent="clearSearch()">
                    <i class="ri-book-2-line"></i>
                    Docs
                </a>
                <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">
                    <span x-text="projects.length"></span> projects indexed
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Search -->
    <div class="hero" x-show="!searched">
        <div class="container">
            <h1>Search Documentation</h1>
            <p>Semantic search across all your documentation</p>
            <div class="search-wrapper">
                <form @submit.prevent="search()" class="search-container">
                    <i class="ri-search-line search-icon"></i>
                    <input 
                        type="text" 
                        class="search-input" 
                        placeholder="Search documentation..."
                        x-model="query"
                        autofocus
                    >
                    <button 
                        type="button"
                        class="clear-button"
                        x-show="query.length > 0"
                        @click="query = ''"
                    >
                        <i class="ri-close-line"></i>
                    </button>
                    <div class="search-filters">
                        <div class="select-wrapper" x-data="{ open: false }">
                            <button type="button" class="select-trigger" @click="open = !open">
                                <span x-text="selectedProject || 'All projects'"></span>
                                <i class="ri-arrow-down-s-line" :style="open ? 'transform: rotate(180deg)' : ''"></i>
                            </button>
                            <div class="select-dropdown" x-show="open" @click.away="open = false" x-cloak>
                                <div class="select-option" :class="{ selected: !selectedProject }" @click="selectedProject = ''; open = false">
                                    All projects
                                </div>
                                <template x-for="project in projects" :key="project.name">
                                    <div class="select-option" :class="{ selected: selectedProject === project.name }" 
                                         @click="selectedProject = project.name; open = false" x-text="project.name"></div>
                                </template>
                            </div>
                        </div>
                        <button type="submit" class="search-button">
                            <span x-show="!loading">Search</span>
                            <span x-show="loading" class="loading"></span>
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- Project Cards -->
            <div class="projects-grid" x-show="projects.length > 0">
                <template x-for="project in projects" :key="project.name">
                    <div class="project-card" @click="selectedProject = project.name; query = '*'; search()">
                        <h3 x-text="project.name"></h3>
                        <p>
                            <span x-text="'Created ' + new Date(project.created).toLocaleDateString()"></span>
                        </p>
                    </div>
                </template>
            </div>
        </div>
    </div>

    <!-- Search Bar (Sticky) -->
    <div x-show="searched" style="padding: 2rem 0; border-bottom: 1px solid hsl(var(--border));">
        <div class="container">
            <div class="search-wrapper">
                <form @submit.prevent="search()" class="search-container">
                    <i class="ri-search-line search-icon"></i>
                    <input 
                        type="text" 
                        class="search-input" 
                        placeholder="Search documentation..."
                        x-model="query"
                    >
                    <button 
                        type="button"
                        class="clear-button"
                        x-show="query.length > 0"
                        @click="query = ''"
                    >
                        <i class="ri-close-line"></i>
                    </button>
                    <div class="search-filters">
                        <div class="select-wrapper" x-data="{ open: false }">
                            <button type="button" class="select-trigger" @click="open = !open">
                                <span x-text="selectedProject || 'All projects'"></span>
                                <i class="ri-arrow-down-s-line" :style="open ? 'transform: rotate(180deg)' : ''"></i>
                            </button>
                            <div class="select-dropdown" x-show="open" @click.away="open = false" x-cloak>
                                <div class="select-option" :class="{ selected: !selectedProject }" @click="selectedProject = ''; open = false">
                                    All projects
                                </div>
                                <template x-for="project in projects" :key="project.name">
                                    <div class="select-option" :class="{ selected: selectedProject === project.name }" 
                                         @click="selectedProject = project.name; open = false" x-text="project.name"></div>
                                </template>
                            </div>
                        </div>
                        <button type="submit" class="search-button">
                            <span x-show="!loading">Search</span>
                            <span x-show="loading" class="loading"></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Results -->
    <div class="container">
        <div x-show="searched && results.length > 0" class="results-container">
            <div class="results-header">
                <div class="results-count">
                    Found <span x-text="results.length"></span> results for "<span x-text="query"></span>"
                </div>
            </div>
            
            <template x-for="result in results" :key="result.id">
                <div class="result-item" @click="showDocument(result)">
                    <div class="result-header">
                        <h3 class="result-title" x-text="getTitle(result)"></h3>
                        <span class="result-relevance" x-text="result.relevance + '%'"></span>
                    </div>
                    <div class="result-url" x-text="result.metadata.url || result.metadata.path"></div>
                    <div class="result-content markdown-preview" x-html="renderMarkdownPreview(result.content)"></div>
                </div>
            </template>

            <div class="raw-toggle">
                <button class="raw-button" @click="showRaw = !showRaw">
                    <span x-text="showRaw ? 'Hide' : 'Show'"></span> raw MCP response
                </button>
                <div x-show="showRaw" class="raw-content">
                    <pre x-text="JSON.stringify(lastResponse, null, 2)"></pre>
                </div>
            </div>
        </div>

        <div x-show="searched && results.length === 0" class="empty-state">
            <p>No results found for "<span x-text="query"></span>"</p>
            <p style="font-size: 0.875rem; margin-top: 0.5rem;">Try different search terms or select another project</p>
        </div>
    </div>

    <!-- Document Modal -->
    <div class="modal-backdrop" x-show="selectedDoc" @click.self="selectedDoc = null" x-cloak>
        <div class="modal">
            <div class="modal-header">
                <h2 class="modal-title" x-text="getTitle(selectedDoc)"></h2>
                <div class="modal-actions">
                    <button class="toggle-markdown" @click="showPlainText = !showPlainText">
                        <i :class="showPlainText ? 'ri-markdown-line' : 'ri-text'"></i>
                        <span x-text="showPlainText ? 'Show Markdown' : 'Show Plain Text'"></span>
                    </button>
                    <button class="modal-close" @click="selectedDoc = null">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
            </div>
            <div class="modal-body">
                <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-bottom: 1.5rem;">
                    <span x-text="selectedDoc?.metadata?.url || selectedDoc?.metadata?.path"></span>
                </div>
                <div x-show="!showPlainText" class="markdown-content" x-html="selectedDoc && marked.parse(selectedDoc.content)"></div>
                <pre x-show="showPlainText" class="plain-content" x-text="selectedDoc?.content"></pre>
            </div>
        </div>
    </div>

    <script>
        function docsApp() {
            return {
                query: '',
                selectedProject: '',
                projects: [],
                results: [],
                loading: false,
                searched: false,
                showRaw: false,
                showPlainText: false,
                lastResponse: null,
                selectedDoc: null,
                
                async init() {
                    // Configure marked options
                    marked.setOptions({
                        breaks: true,
                        gfm: true,
                        headerIds: false,
                        mangle: false
                    });
                    
                    // Load projects
                    try {
                        const response = await fetch('/api/projects');
                        const data = await response.json();
                        this.projects = data.projects;
                    } catch (error) {
                        console.error('Failed to load projects:', error);
                    }
                },
                
                async search() {
                    if (!this.query.trim()) return;
                    
                    this.loading = true;
                    this.searched = true;
                    
                    try {
                        const params = new URLSearchParams({
                            q: this.query,
                            ...(this.selectedProject && { project: this.selectedProject })
                        });
                        
                        const response = await fetch(\`/api/search?\${params}\`);
                        const data = await response.json();
                        
                        this.results = data.results.map(r => ({
                            ...r,
                            relevance: Math.round((1 - (r.distance || 0)) * 100)
                        }));
                        
                        this.lastResponse = {
                            tool: 'searchDocs',
                            arguments: {
                                query: this.query,
                                projectName: this.selectedProject || undefined,
                                limit: 10
                            },
                            response: data
                        };
                    } catch (error) {
                        console.error('Search failed:', error);
                        this.results = [];
                    } finally {
                        this.loading = false;
                    }
                },
                
                clearSearch() {
                    this.query = '';
                    this.results = [];
                    this.searched = false;
                    this.selectedProject = '';
                    this.showRaw = false;
                },
                
                showDocument(doc) {
                    this.selectedDoc = doc;
                    this.showPlainText = false;
                },
                
                getTitle(item) {
                    if (!item) return 'Untitled';
                    // Check multiple possible locations for title
                    return item.metadata?.title || 
                           item.metadata?.metadata?.title || 
                           item.title || 
                           'Untitled';
                },
                
                renderMarkdownPreview(content) {
                    if (!content) return '';
                    // Truncate and render first part of content
                    const truncated = content.substring(0, 300);
                    const rendered = marked.parse(truncated);
                    // Remove excessive whitespace and newlines for preview
                    return rendered.replace(/<p>/g, ' ').replace(/<\\/p>/g, ' ')
                                  .replace(/<br>/g, ' ').replace(/\\s+/g, ' ')
                                  .trim() + '...';
                }
            }
        }
    </script>
</body>
</html>
`

// API Endpoints
fastify.get('/', async (_request, reply) => {
    reply.type('text/html').send(htmlTemplate())
})

// API: Get projects
fastify.get('/api/projects', async (_request, reply) => {
    const projects = await db.listProjects()
    reply.send({ projects })
})

// API: Search
fastify.get('/api/search', async (request, reply) => {
    const { q, project } = request.query as { q: string; project?: string }
    
    if (!q) {
        return reply.status(400).send({ error: 'Query parameter required' })
    }

    const results = await db.searchDocs(q, {
        projectName: project || undefined,
        limit: 10
    })

    reply.send({ results })
})

// API: Get document
fastify.get('/api/doc/:project/*', async (request, reply) => {
    const { project } = request.params as { project: string }
    const path = (request.params as any)['*']
    
    const doc = await db.getDocByPath(project, `/${path}`)
    
    if (!doc) {
        return reply.status(404).send({ error: 'Document not found' })
    }

    reply.send(doc)
})

// Start server
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' })
        console.log('Web interface running at http://localhost:3000')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()