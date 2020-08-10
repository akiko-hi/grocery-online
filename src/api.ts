export type Category = {
    id: number
    name: string
    image: string
    color: string
}

export async function getCategories(): Promise<Category[]> {
    const res = await fetch('/api/categories/');
    return res.json()
}