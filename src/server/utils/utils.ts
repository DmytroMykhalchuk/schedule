export const getRandomNumber = (sizeFrom = 6, sizeTo = 6) => {
    const size = sizeFrom === sizeTo
        ? sizeFrom
        : getRandomInt(sizeFrom, sizeTo);

    return (Math.random() * (10 ** size)).toFixed();
};

export const getRandomPictureUrl = () => {
    const keyWords = [
        'Apple', 'Banana', 'Orange', 'Strawberry', 'Grapes',
        'Pineapple', 'Watermelon', 'Mango', 'Kiwi', 'Peach',
        'Cherry', 'Pear', 'Plum', 'Blueberry', 'Raspberry',
        'Avocado', 'Pomegranate', 'Apricot', 'Cantaloupe', 'Lemon',
        'Coconut', 'Fig', 'Grapefruit', 'Guava', 'Nectarine',
        'Papaya', 'Passion Fruit', 'Persimmon', 'Dragon Fruit'
    ];
    return 'https://source.unsplash.com/random?' + keyWords[Math.floor(Math.random() * keyWords.length)];
};

export const getRandomString = (from = 50, to = 50) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;

    const targetLength = getRandomInt(from, to);

    while (counter < targetLength) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    return result;
};

export const getRandomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getRandomBoolean = (probability = 0.5) => {
    return Math.random() > probability;
};

export const getRandomInt = (min: number, max: number): number => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};