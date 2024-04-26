<template>
    <div class="comero-boxed">
        <div class="body">
            <TopHeaderStyleThree />
            <MenubarStyleThree />
            <Banner />
            <CategoryBoxes />
            <SpecialOffer />
            <Facility />
            <BestSellersProducts class="ptb-60" />
            <Subscribe />
            <Partner />
            <InstagramPhotos />
        </div>
    </div>
</template>

<script>
import TopHeaderStyleThree from '../layouts/TopHeaderStyleThree'
import MenubarStyleThree from '../layouts/MenubarStyleThree'
import Banner from '../components/diction-nine/Banner'
import CategoryBoxes from '../components/diction-nine/CategoryBoxes'
import SpecialOffer from '../components/common/SpecialOffer'
import Facility from '../components/common/Facility';
import BestSellersProducts from '../components/common/BestSellersProducts'
import Subscribe from '../components/common/Subscribe'
import Partner from '../components/common/Partner'
import InstagramPhotos from '../components/common/InstagramPhotos'

export default {
    components: {
        TopHeaderStyleThree,
        MenubarStyleThree,
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