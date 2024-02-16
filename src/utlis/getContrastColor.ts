export const getContrastColor = (hexColor: string) => {
    // Convert hex color to RGB
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    // Calculate perceived brightness using the formula (0.299*R + 0.587*G + 0.114*B)
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

    // Determine the best contrasting color based on brightness
    return brightness > 186 ? '#000000' : '#FFFFFF';
};