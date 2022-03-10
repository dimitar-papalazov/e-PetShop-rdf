//package mk.ukim.finki.vbs.web.config;
//
//import mk.ukim.finki.vbs.web.model.Member;
//import mk.ukim.finki.vbs.web.model.Product;
//import mk.ukim.finki.vbs.web.model.dto.OrderDto;
//import mk.ukim.finki.vbs.web.model.dto.ProductDto;
//import mk.ukim.finki.vbs.web.model.enumerations.MemberRole;
//import mk.ukim.finki.vbs.web.model.enumerations.Type;
//import mk.ukim.finki.vbs.web.service.MemberService;
//import mk.ukim.finki.vbs.web.service.OrderService;
//import mk.ukim.finki.vbs.web.service.ProductService;
//import org.springframework.stereotype.Component;
//
//import javax.annotation.PostConstruct;
//import java.util.ArrayList;
//import java.util.List;
//
//@Component
//public class DataInitializer {
//    private final ProductService productService;
//    private final MemberService userService;
//    private final OrderService orderService;
//
//    public DataInitializer(ProductService productService, MemberService userService, OrderService orderService) {
//        this.productService = productService;
//        this.userService = userService;
//        this.orderService = orderService;
//    }
//
//    @PostConstruct
//    public void initData() {
//        Product dogFood =
//                this.productService.addProduct(new ProductDto((long) Type.DOGS.ordinal(),
//                        "https://prijateli5.com/wp-content/uploads/2020/11/advance-medium-puppy.jpg",
//                        "Храна за куче",
//                        340.0,
//                        10,
//                        0)).get();
//        Product dogToy =
//                this.productService.addProduct(new ProductDto((long) Type.DOGS.ordinal(),
//                        "https://prijateli5.com/wp-content/uploads/2019/03/camon-igracka-2.jpg",
//                        "Играчка за куче",
//                        200.0,
//                        10,
//                        0)).get();
//        Product dogContainer =
//                this.productService.addProduct(new ProductDto((long) Type.DOGS.ordinal(),
//                        "https://prijateli5.com/wp-content/uploads/2016/05/trixie-dwie-miski-045l-na-stojaku-24831-.jpg",
//                        "Сад за храна за куче",
//                        390.0,
//                        10,
//                        0)).get();
//        Product dogStrap =
//                this.productService.addProduct(new ProductDto((long) Type.DOGS.ordinal(),
//                        "https://prijateli5.com/wp-content/uploads/2016/05/280-1.jpg",
//                        "Ремче за куче",
//                        490.0,
//                        10,
//                        0)).get();
//        Product catFood =
//                this.productService.addProduct(new ProductDto((long) Type.CATS.ordinal(),
//                        "https://prijateli5.com/wp-content/uploads/2020/03/88000814_2776330202451122_5431583167720980480_n.jpg",
//                        "Храна за маче",
//                        40.0,
//                        10,
//                        0)).get();
//        Product catToy =
//                this.productService.addProduct(new ProductDto((long) Type.CATS.ordinal(),
//                        "https://prijateli5.com/wp-content/uploads/2020/06/gluvcinja.jpg",
//                        "Играчка за маче",
//                        170.0,
//                        10,
//                        0)).get();
//        Product catScratcher =
//                this.productService.addProduct(new ProductDto((long) Type.CATS.ordinal(),
//                        "https://prijateli5.com/wp-content/uploads/2021/02/rb-038.jpg",
//                        "Гребалка за маче",
//                        1200.0,
//                        1,
//                        18)).get();
//        this.productService.addProduct(new ProductDto((long) Type.RODENTS.ordinal(),
//                "https://prijateli5.com/wp-content/uploads/2019/04/MANITOBA-MIX-CONIGLIETTO-1-KG-extra-big-9487-547.jpg",
//                "Храна за зајак",
//                200.0,
//                10,
//                0));
//        this.productService.addProduct(new ProductDto((long) Type.RODENTS.ordinal(),
//                "https://prijateli5.com/wp-content/uploads/2019/12/hranilka-013.jpg",
//                "Сад за храна за глодари",
//                150.0,
//                10,
//                0));
//        this.productService.addProduct(new ProductDto((long) Type.BIRDS.ordinal(),
//                "https://prijateli5.com/wp-content/uploads/2019/04/poilka-za-glodari-100ml-sifra-60521-cena-140-den-zemja-germanija.jpg",
//                "Поилка за птици",
//                140.0,
//                10,
//                0));
//        this.productService.addProduct(new ProductDto((long) Type.BIRDS.ordinal(),
//                "https://prijateli5.com/wp-content/uploads/2020/12/zvp2100.jpg",
//                "Храна за птици",
//                210.0,
//                10,
//                0));
//        this.productService.addProduct(new ProductDto((long) Type.BIRDS.ordinal(),
//                "https://prijateli5.com/wp-content/uploads/2019/04/2512-thickbox_default-Kafez-za-ptici-set-Fop-10410011.jpg",
//                "Кафез за птици",
//                1900.0,
//                10,
//                0));
//        this.productService.addProduct(new ProductDto((long) Type.BIRDS.ordinal(),
//                "https://prijateli5.com/wp-content/uploads/2016/05/223.jpg",
//                "Сад за храна за птици",
//                120.0,
//                10,
//                0));
//        this.productService.addProduct(new ProductDto((long) Type.AQUA.ordinal(),
//                "https://prijateli5.com/wp-content/uploads/2019/04/2845_pla_sera_goldy_250ml_1.jpg",
//                "Храна за риби",
//                160.0,
//                10,
//                0));
//        this.productService.addProduct(new ProductDto((long) Type.AQUA.ordinal(),
//                "https://prijateli5.com/wp-content/uploads/2019/04/akvarium-2.jpg",
//                "Аквариум за риби",
//                1500.0,
//                10,
//                0));
//        this.productService.addProduct(new ProductDto((long) Type.AQUA.ordinal(),
//                "https://prijateli5.com/wp-content/uploads/2016/05/at-202.jpg",
//                "Пумпа за аквариум за риби",
//                1090.0,
//                10,
//                0));
//
//        Member admin = this.userService.register("admin",
//                        "epetshop.project@gmail.com", "admin","admin", "admin",
//                        "admin",
//                        MemberRole.ROLE_ADMIN);
//        Member dp = this.userService.register("dp", "d.papalazov@outlook.com"
//                , "dp", "dp", "Dimitar", " Papalazov", MemberRole.ROLE_USER);
//        Member as = this.userService.register("as", "yourpapauniverse@gmail.com"
//                , "as", "as", "Angela", " Sotirovska", MemberRole.ROLE_USER);
//
//        List<Long> dpProducts = new ArrayList<>();
//        dpProducts.add(catScratcher.getId());
//        dpProducts.add(catFood.getId());
//        dpProducts.add(catToy.getId());
//
//        List<Long> asProducts = new ArrayList<>();
//        asProducts.add(dogFood.getId());
//        asProducts.add(dogContainer.getId());
//
//        orderService.addOrder(new OrderDto(dp.getUsername(), "+38975835665",
//                "Krume Kepeski 26", "Bitola", "7000", true, dpProducts));
//        orderService.addOrder(new OrderDto(as.getUsername(), "+38970000000",
//                "Ulica ulica 13", "Skopje", "0000", false, asProducts));
//
//
//    }
//}
