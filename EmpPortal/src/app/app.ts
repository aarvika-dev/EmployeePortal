import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ThemeMetric {
  value: string;
  label: string;
}

interface LinkItem {
  label: string;
  target: string;
}

interface ThemeCard {
  title: string;
  description: string;
  tag: string;
}

interface ThemePlan {
  eyebrow: string;
  name: string;
  headline: string;
  description: string;
  badge: string;
  accent: string;
  layout: 'cinema' | 'studio' | 'academy';
  metrics: ThemeMetric[];
  navigation: LinkItem[];
  cards: ThemeCard[];
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly themes: ThemePlan[] = [
    {
      eyebrow: 'Sample 01 · CreatorTube Hub',
      name: 'Cinema slider theme',
      headline: 'A YouTube-first learning platform with a bold hero carousel.',
      description:
        'Designed for ad-supported traffic: clear navigation, premium course cards, search-first video discovery, and content blocks that leave safe inventory space for Google Ads.',
      badge: 'Hero slider + dark creator brand',
      accent: '#ff2d55',
      layout: 'cinema',
      metrics: [
        { value: '50K+', label: 'YouTube subscribers' },
        { value: '400+', label: 'tutorial videos' },
        { value: '12', label: 'project APIs' }
      ],
      navigation: [
        { label: 'Videos', target: 'Searchable playlist' },
        { label: 'Blogs', target: 'Interview notes' },
        { label: 'Batches', target: 'Weekend live' },
        { label: '1:1', target: 'CV + mock interview' }
      ],
      cards: [
        {
          title: 'Angular interview roadmap',
          description: 'Playlist-style cards with filters for topic, level, and duration.',
          tag: 'Video'
        },
        {
          title: 'Employee Management API',
          description: 'Project API landing card with docs, endpoints, and GitHub links.',
          tag: 'API'
        },
        {
          title: 'Weekend placement batch',
          description: 'Batch schedule, seat status, syllabus, testimonials, and CTA.',
          tag: 'Live'
        }
      ]
    },
    {
      eyebrow: 'Sample 02 · Code Mentor Studio',
      name: 'Clean studio theme',
      headline: 'A crisp professional site for mentorship, blogs, and paid sessions.',
      description:
        'Light, editorial, and highly scannable. Best when the goal is trust-building for private batches, one-to-one connect, CV preparation, blogs, and interview coaching.',
      badge: 'Editorial cards + trust focused',
      accent: '#2563eb',
      layout: 'studio',
      metrics: [
        { value: '8+', label: 'active cohorts' },
        { value: '1:1', label: 'career calls' },
        { value: '24/7', label: 'resource access' }
      ],
      navigation: [
        { label: 'Mentorship', target: 'Book slots' },
        { label: 'Courses', target: 'Angular React .NET' },
        { label: 'Articles', target: 'Deep-dive blogs' },
        { label: 'Projects', target: 'API catalog' }
      ],
      cards: [
        {
          title: 'CV preparation sprint',
          description: 'Service card for resume review, LinkedIn cleanup, and job targeting.',
          tag: 'Service'
        },
        {
          title: 'React system design notes',
          description: 'Blog cards optimized for reading time and related video embeds.',
          tag: 'Blog'
        },
        {
          title: 'Mock interview weekend',
          description: 'Live event module with registration, agenda, and replay library.',
          tag: 'Event'
        }
      ]
    },
    {
      eyebrow: 'Sample 03 · Dev Academy Pro',
      name: 'Neon academy theme',
      headline: 'A modern academy dashboard for courses, APIs, and live learning.',
      description:
        'High-energy design for a developer community. It groups free videos, premium batches, project APIs, coding challenges, and ad-ready content zones into one product-like experience.',
      badge: 'Dashboard grid + neon gradients',
      accent: '#8b5cf6',
      layout: 'academy',
      metrics: [
        { value: '30+', label: 'learning paths' },
        { value: '15+', label: 'sample apps' },
        { value: '5K+', label: 'monthly learners' }
      ],
      navigation: [
        { label: 'Dashboard', target: 'Personalized feed' },
        { label: 'APIs', target: 'Project library' },
        { label: 'Live', target: 'Cohort rooms' },
        { label: 'Ads', target: 'Policy-ready pages' }
      ],
      cards: [
        {
          title: 'Railway ticket booking app',
          description: 'API showcase with stack, endpoints, demo video, and setup guide.',
          tag: 'Project'
        },
        {
          title: '.NET micro API playlist',
          description: 'Search result tile for a topic-specific YouTube playlist.',
          tag: 'Course'
        },
        {
          title: 'Google Ads safe layout',
          description: 'Reserved placements separated from navigation and interactive CTAs.',
          tag: 'Monetize'
        }
      ]
    }
  ];

  readonly apiProjects = [
    'Employee Management API',
    'Live Tracker API',
    'Dashboard Management API',
    'Trade Bus Booking API',
    'Book Store API',
    'Railway Ticket Booking API'
  ];
}
