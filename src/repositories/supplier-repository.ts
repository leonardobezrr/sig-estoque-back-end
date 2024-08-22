import { Prisma, Supplier } from "@prisma/client";

export interface SupplierRepository {
    create(data: Prisma.SupplierCreateInput): Promise<Supplier>;
    findMany(): Promise<Supplier[]>;
    findManyBySocialName(socialName: string): Promise<Supplier[]>;
    findManyByCompanyName(companyName: string): Promise<Supplier[]>;
    findById(id: string): Promise<Supplier | null>;
    patch(id: string, supplier: Prisma.SupplierUpdateInput): Promise<Supplier | null>;
    delete(id: string): Promise<Supplier | null>
  }