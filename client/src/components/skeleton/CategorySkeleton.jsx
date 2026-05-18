export const Categoryskeleton = ({ count = 9 }) => {
    Array.from({ length: count }).map((_, i) => (
        <div
            key={i}
            className='shrink-0 h-24 w-24 rounded-full bg-stone-300 animate-pulse'
        />
    ));
};
