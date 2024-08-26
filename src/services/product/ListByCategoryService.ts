import prismaClient from "../../prisma";

interface ProductRequest {
    category_id: string;
}

class ListByCategoryService {
  async execute({category_id}: ProductRequest) {
    
    const findByCategory = await prismaClient.products.findMany({
        where: {
            category_Id: category_id
        }
    });

    return findByCategory;

  }
}

export { ListByCategoryService };