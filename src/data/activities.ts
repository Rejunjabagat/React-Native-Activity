export type EntryStatus = 'open' | 'planned';

export type Entry = {
  id: string;
  title: string;
  subtitle: string;
  status: EntryStatus;
  /** Which screen the dashboard card opens; null for entries not built yet. */
  target: 'activity' | 'settings' | null;
  description: string;
  requirements: string[];
};

/**
 * The dashboard menu. Activity #5 is the only activity that exists so far;
 * the other entries are placeholders for the laboratories and the final
 * project that this app is meant to collect.
 */
export const ENTRIES: Entry[] = [
  {
    id: 'activity-5',
    title: 'Activity #5',
    subtitle: 'Multi-screen React Native app',
    status: 'open',
    target: 'activity',
    description:
      'The app required for this activity: a dashboard that works as a menu, reusable components, local state on a screen, and global preferences shared by the whole app.',
    requirements: [
      'Initialize a React Native project',
      'Build multi-screen navigation',
      'Make the Home dashboard act as a menu',
      'Use reusable components for static elements',
      'Handle local interaction with useState and useEffect',
      'Use Flexbox so no screen overflows',
      'Share a global parameter through Context API',
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    subtitle: 'Theme and profile',
    status: 'open',
    target: 'settings',
    description:
      'Where the two global parameters are changed. The dashboard repaints as soon as either value changes.',
    requirements: [],
  },
  {
    id: 'activity-6',
    title: 'Activity #6',
    subtitle: 'Reserved for the next laboratory activity',
    status: 'planned',
    target: null,
    description: 'This screen will be added after the next laboratory activity.',
    requirements: [],
  },
  {
    id: 'final-project',
    title: 'Final Project',
    subtitle: 'Compilation of all laboratory activities',
    status: 'planned',
    target: null,
    description:
      'The final requirement will be added to this dashboard once it is assigned.',
    requirements: [],
  },
];

export function getEntryById(id: string): Entry | undefined {
  return ENTRIES.find(entry => entry.id === id);
}
