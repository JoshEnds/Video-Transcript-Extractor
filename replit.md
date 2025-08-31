# Overview

This is a full-stack web application built with React and Express.js that appears to be a YouTube Transcript Extractor. The application allows users to input YouTube URLs and extract transcripts from videos. It features a modern UI built with shadcn/ui components and Tailwind CSS, with a backend API structure ready for implementation.

The project uses a monorepo structure with separate client and server directories, shared schema definitions, and includes comprehensive UI components for building rich user interfaces. The application is set up for PostgreSQL database integration using Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Build Tool**: Vite for fast development and optimized builds

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Structure**: RESTful API with `/api` prefix for all routes
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage Layer**: Abstracted storage interface with in-memory implementation (expandable to PostgreSQL)
- **Development**: Hot module replacement and middleware for request logging

## Data Storage
- **Database**: PostgreSQL (configured but not yet connected)
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Schema**: Shared TypeScript schema definitions between client and server

## Project Structure
- **Monorepo Layout**: Client, server, and shared code in separate directories
- **Shared Schema**: Common type definitions and validation schemas
- **Build Output**: Separate build processes for client (static files) and server (bundled Node.js)

## Development Features
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared code
- **Development Tools**: Replit integration with cartographer and runtime error overlay
- **Code Quality**: ESM modules, strict TypeScript configuration
- **Asset Management**: Vite-based asset resolution with path aliases

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **Backend**: Express.js, Node.js runtime
- **Build Tools**: Vite, esbuild for production builds

## Database & ORM
- **Database**: PostgreSQL (via @neondatabase/serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Connection**: Neon serverless PostgreSQL adapter

## UI & Styling
- **Component Library**: Radix UI primitives (@radix-ui/*)
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React icon library
- **Utilities**: class-variance-authority, clsx for conditional styling

## Data Management
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod resolvers
- **Validation**: Zod for runtime type validation
- **Date Handling**: date-fns for date manipulation

## Development Tools
- **Replit Integration**: Custom Vite plugins for Replit environment
- **TypeScript**: Full type coverage with strict configuration
- **Carousel**: Embla Carousel for UI components
- **Command Interface**: cmdk for command palette functionality

## Potential Integrations
- **YouTube API**: For transcript extraction (not yet implemented)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Authentication**: Framework ready for user authentication system