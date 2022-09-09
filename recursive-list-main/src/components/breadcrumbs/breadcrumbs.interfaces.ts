export interface Breadcrumb {
  path: string;
  name: string;
}

export interface GetBreadcrumbList {
  (): Breadcrumb[];
}
