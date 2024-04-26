<template>
    <div>
        <TopHeaderStyleThree />
        <MenubarStyleFour />
        <Banner />
        <CategoryBoxes />
        <SpecialOffer />
        <Facility />
        <BestSellersProducts class="pt-60" />
        <Subscribe />
        <Partner />
        <InstagramPhotos />
    </div>
</template>

<script>
import TopHeaderStyleThree from '../layouts/TopHeaderStyleThree'
import MenubarStyleFour from '../layouts/MenubarStyleFour'
import Banner from '../components/diction-eleven/Banner'
import CategoryBoxes from '../components/diction-eleven/CategoryBoxes'
import SpecialOffer from '../components/common/SpecialOffer'
import Facility from '../components/common/Facility';
import BestSellersProducts from '../components/common/BestSellersProducts'
import Subscribe from '../components/common/Subscribe'
import Partner from '../components/common/Partner'
import InstagramPhotos from '../components/common/InstagramPhotos'

export default {
    components: {
        TopHeaderStyleThree,
        MenubarStyleFour,
        Banner,
        CategoryBoxes,
        SpecialOffer,
        Facility,
        BestSellersProducts,
        Subscribe,
        Partner,
        InstagramPhotos,
    },
}
</script>