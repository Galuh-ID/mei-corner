import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        summary: z.string(),
        tags: z.array(z.string()),
        featured: z.boolean(),
        rank: z.number().nullable(),
        coverImage: z.string().nullable(),
        hasDataViz: z.boolean(),
        language: z.enum(['id', 'en']),
        translationOf: z.string().nullable(),
    })
});

const modulesCollection = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/modules" }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        subject: z.string(),
        level: z.enum(['elementary', 'junior', 'senior', 'college']),
        summary: z.string(),
        glossaryTerms: z.array(z.string()).optional(),
        language: z.enum(['id', 'en']),
        translationOf: z.string().nullable(),
    })
});

const glossaryCollection = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/glossary" }),
    schema: z.object({
        term: z.string(),
        slug: z.string(),
        aliases: z.array(z.string()),
        definition: z.string(),
        language: z.enum(['id', 'en']),
    })
});

const certificationsCollection = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/certifications" }),
    schema: z.object({
        title: z.string(),
        issuer: z.string(),
        slug: z.string(),
        date: z.string(),
        featured: z.boolean(),
        rank: z.number().nullable(),
        credentialUrl: z.string().nullable(),
    })
});

export const collections = {
    'projects': projectsCollection,
    'modules': modulesCollection,
    'glossary': glossaryCollection,
    'certifications': certificationsCollection,
};