import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface MediaItem {
  type: string;
  quality: string;
  thumbnail: string;
  url: string;
}

export interface DownloadResult {
  thumbnail: string;
  title: string;
  author: string;
  downloadUrl: string;
  type?: string;
  quality?: string;
  caption?: string;
  username?: string;
  mediaUrls?: MediaItem[];
  isCarousel?: boolean;
  mediaCount?: number;
  likes?: number;
  comments?: number;
  duration?: number;
  views?: number;
}

export enum DownloadState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}