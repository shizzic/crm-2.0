import { defineStore } from 'pinia'

export interface Components {
  [k: string]: Component
}
export interface Component {
  id?: number
}

export const useComponentsStore = defineStore('components', () => {
  const list: Readonly<Components> = {
    access: { id: 1 },
    roles: { id: 1 },

    brands: { id: 2 },
    'brand-category': { id: 2 },

    product: { id: 3 },
    product_page: { id: 3 },
    departments: { id: 3 },
    'product-category': { id: 3 },
    property: { id: 3 },
    'property-category': { id: 3 },

    countries: { id: 4 },
    regions: { id: 4 },
    cities: { id: 4 },

    company: { id: 5 },
    'company-type': { id: 5 },
    'company-tax': { id: 5 },
    banks: { id: 5 },

    domains: { id: 6 },

    outlets: { id: 7 },
    storages: { id: 7 },
    'department-store-project': { id: 7 },

    nets: { id: 8 },
    project: { id: 8 },
    'store-type': { id: 8 },
    'project-status': { id: 8 },

    'project-store': { id: 9 },
    workshift: { id: 9 },
    schedule: { id: 9 },

    report: { id: 10 },
    'report-table': { id: 10 },
    'report-store': { id: 10 },
    'report-template': { id: 11 },

    registration: { id: 12 },
    users: { id: 12 },
    team: { id: 12 },
    'user-status': { id: 12 },

    'black-list': { id: 13 },

    booker: { id: 14 },
    'booker-user': { id: 14 },

    sole: { id: 15 },
    'sole-status': { id: 15 },
    'sole-contract': { id: 15 },
    'sole-contract-type': { id: 15 },
    'sole-contract-extra': { id: 15 },
    contribution: { id: 15 },
    'tax-report': { id: 15 },
    tax: { id: 15 },
    declaration: { id: 15 },
    'archive-sole': { id: 15 },
    'archive-bank': { id: 15 },
    'sole-contract-archive': { id: 15 },
    act: { id: 15 },
    'act-group': { id: 15 },

    document: { id: 16 },
    'document-type': { id: 16 },
    'document-template': { id: 16 },
    document_queue: { id: 16 },
    'act-report-upload': { id: 16 },

    candidate: { id: 19 },
    candidate_source: { id: 19 },
    candidate_status: { id: 19 },
    candidate_black_list: { id: 19 },

    vacancy: { id: 19 },

    chat: {},
    settings: {},
    profile: {},
    main: {}
  }

  return { list }
})
