export type Activity = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  accent: string;
  status: 'done' | 'current' | 'upcoming';
  description: string;
  requirements: string[];
};

export const ACTIVITIES: Activity[] = [
  {
    id: 'activity-1',
    title: 'Environment Setup',
    subtitle: 'RN CLI, JDK, Android SDK',
    icon: '🧰',
    accent: '#5B93FF',
    status: 'done',
    description:
      'Installed and verified the full React Native toolchain: Node, JDK 17, Android SDK, emulator and a hardware accelerator.',
    requirements: [
      'Node.js and npm installed',
      'JDK 17 configured through JAVA_HOME',
      'Android SDK with platform 36',
      'Emulator boots and installs a debug build',
    ],
  },
  {
    id: 'activity-2',
    title: 'Core Components',
    subtitle: 'View, Text, Image, Pressable',
    icon: '🧩',
    accent: '#12B76A',
    status: 'done',
    description:
      'Practised the declarative building blocks of React Native and composed them into small, reusable components.',
    requirements: [
      'Text, View and Image composed in a layout',
      'Pressable with pressed-state feedback',
      'Props typed with TypeScript',
      'Styles kept out of the component body',
    ],
  },
  {
    id: 'activity-3',
    title: 'Flexbox Layouts',
    subtitle: 'flex, direction, alignment',
    icon: '📐',
    accent: '#FF7A59',
    status: 'done',
    description:
      'Built layout exercises that rely on Flexbox only — no fixed pixel widths — so the UI adapts to any screen.',
    requirements: [
      'flexDirection and flexWrap used deliberately',
      'justifyContent and alignItems control spacing',
      'ScrollView prevents vertical overflow',
      'Layout survives rotation without clipping',
    ],
  },
  {
    id: 'activity-4',
    title: 'State & Events',
    subtitle: 'useState, useEffect, lists',
    icon: '⚡',
    accent: '#B26BFF',
    status: 'done',
    description:
      'Local, screen-specific interactions driven by hooks: counters, toggles, form drafts and side effects.',
    requirements: [
      'useState for local screen state',
      'useEffect for lifecycle side effects',
      'FlatList / map with stable keys',
      'Controlled TextInput with validation',
    ],
  },
  {
    id: 'activity-5',
    title: 'Navigation & Global State',
    subtitle: 'Multi-screen app, Context API',
    icon: '🧭',
    accent: '#2F6BFF',
    status: 'current',
    description:
      'The master dashboard: stack navigation, a reusable component library, a responsive card grid, and global theme + profile state shared across every screen.',
    requirements: [
      'Multi-screen navigation with a Home dashboard',
      'Reusable components (cards, buttons, headers)',
      'Responsive Flexbox grid, no overflow on any size',
      'React Context API for the dark / light theme',
      'Theme and profile name update instantly everywhere',
    ],
  },
  {
    id: 'final-project',
    title: 'Final Project',
    subtitle: 'Compilation app',
    icon: '🎓',
    accent: '#F5B301',
    status: 'upcoming',
    description:
      'This dashboard becomes the shell for the final requirement: every future laboratory activity is wired in as its own screen.',
    requirements: [
      'All activities reachable from one dashboard',
      'Consistent design system across screens',
      'Global settings applied app-wide',
      'Source repository and demo recording submitted',
    ],
  },
];

export function getActivityById(id: string): Activity | undefined {
  return ACTIVITIES.find(activity => activity.id === id);
}
