import React from 'react'
import { useRouter } from 'next/router'

// TODO: create FE for search page
function SearchPage() {
    const router = useRouter();
    const { q } = router.query;

    return <>Search:{q}
    </>
}

export default SearchPage