export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}

export function isValidPage(value: number) {
    if (value == null) {
        return false;
    }

    if (typeof value !== "number" && isNaN(value)) {
        return false;
    }
    if (value <= 0) {
        return false;
    }

    if (!Number.isInteger(value)) {
        return false;
    }

    return true;
}

export function isAvailable(inventory: number, isPreOrder: boolean) {
    if (inventory == null) {
        return false;
    }

    if (typeof inventory !== "number" || isNaN(inventory)) {
        return false;
    }

    return inventory > 0 || isPreOrder;
}

export function isSoldOut(inventory: number, isPreOrder: boolean) {
    return inventory <= 0 && !isPreOrder;
}

export function getImagePath(image: string) {
    const cloudinaryBaseUrl = "https://res.cloudinary.com";
    if (image.startsWith(cloudinaryBaseUrl)) {
        return image;
    } else {
        if (process.env.API_URL) {
            return `${process.env.API_URL}/img/${image}`;
        } else {
            return `${process.env.NEXT_PUBLIC_API_URL}/img/${image}`;
        }
    }
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
}
