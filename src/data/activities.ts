export type Activity = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  accent: string;
  status: 'done' | 'current' | 'upcoming';
  description: string;
  requirements: string[];
};

export const ACTIVITIES: Activity[] = [
  {
    id: 'activity-1',
    code: '01',
    title: 'Environment Setup',
    subtitle: 'RN CLI · JDK 17 · Android SDK',
    accent: '#5F7D6E',
    status: 'done',
    description:
      'Installed and checked the toolchain: Node, JDK 17, Android SDK, an emulator and a hardware accelerator. A debug build installs and runs on the emulator.',
    requirements: [
      'Node.js and npm installed',
      'JDK 17 set through JAVA_HOME',
      'Android SDK with platform 36',
      'Emulator boots and installs the build',
    ],
  },
  {
    id: 'activity-2',
    code: '02',
    title: 'Core Components',
    subtitle: 'View · Text · Image · Pressable',
    accent: '#6B7F55',
    status: 'done',
    description:
      'Built small screens out of the core components and moved every repeated piece into its own file with typed props.',
    requirements: [
      'Text, View and Image used in a layout',
      'Pressable with pressed-state feedback',
      'Props typed with TypeScript',
      'Styles kept outside the component body',
    ],
  },
  {
    id: 'activity-3',
    code: '03',
    title: 'Flexbox Layout',
    subtitle: 'flex · direction · alignment',
    accent: '#9E512C',
    status: 'done',
    description:
      'Rebuilt the layouts with Flexbox only, no fixed widths, then checked them at several screen sizes with nothing clipped at the edges.',
    requirements: [
      'flexDirection and flexWrap used on purpose',
      'justifyContent and alignItems control spacing',
      'ScrollView stops vertical overflow',
      'Layout survives rotation without clipping',
    ],
  },
  {
    id: 'activity-4',
    code: '04',
    title: 'State and Events',
    subtitle: 'useState · useEffect · lists',
    accent: '#8A6A3B',
    status: 'done',
    description:
      'Local interaction on one screen: counters, a controlled text field, a list with stable keys and a timer that cleans itself up.',
    requirements: [
      'useState for local screen state',
      'useEffect for lifecycle side effects',
      'List rendered with stable keys',
      'Controlled TextInput with validation',
    ],
  },
  {
    id: 'activity-5',
    code: '05',
    title: 'Navigation and Global State',
    subtitle: 'Stack navigation · Context API',
    accent: '#1F4B3E',
    status: 'current',
    description:
      'The shell for the rest of the semester. Three screens on a native stack, a small component library, a grid that re-flows by width, and the theme plus profile kept in one context.',
    requirements: [
      'Multi-screen navigation with a Home dashboard',
      'Reusable cards, buttons and headers',
      'Flexbox grid with no overflow at any width',
      'React Context API holds the theme',
      'Theme and profile name update everywhere at once',
    ],
  },
  {
    id: 'final-project',
    code: '06',
    title: 'Final Project',
    subtitle: 'Compilation app',
    accent: '#5B5B4F',
    status: 'upcoming',
    description:
      'The same dashboard becomes the entry point for the final requirement: each later activity is added as a screen behind the index.',
    requirements: [
      'All activities reachable from one dashboard',
      'One design language across screens',
      'Global settings applied app-wide',
      'Repository and demo recording submitted',
    ],
  },
];

export function getActivityById(id: string): Activity | undefined {
  return ACTIVITIES.find(activity => activity.id === id);
}
