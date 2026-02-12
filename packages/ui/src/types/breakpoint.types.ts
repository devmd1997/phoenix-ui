export type Breakpoint = 'sm' | 'md' | 'lg';

export type ResponsiveProp<T> = Partial<Record<Breakpoint, T>>;
