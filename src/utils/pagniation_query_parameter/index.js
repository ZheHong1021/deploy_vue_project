export const get_api_pagniation_query_parameter = (options) => {
    const { page, itemsPerPage, sortBy, sortDesc, search } = options
    
    const params = new URLSearchParams({
        page: page, // 第幾頁
        page_size: itemsPerPage, // 一頁幾筆數據
    })
    
    
    // 搜尋內容
    if( search ){
        params.append('search', search)
    }
    
    // 排序
    if(sortBy.length > 0){ // 代表有排序
        // sortBy: [<欄位1>]
        // sortDesc: [<欄位1是否倒序(bool)>]
        const ordering = sortBy.map((field, index) => `${sortDesc[index] ? '-' : ''}${field}`)
        params.append('ordering', ordering.join(',')) // 最終要變成字串
    }

    return params
}