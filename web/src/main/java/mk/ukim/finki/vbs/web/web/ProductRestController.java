package mk.ukim.finki.vbs.web.web;

import mk.ukim.finki.vbs.web.model.Product;
import mk.ukim.finki.vbs.web.model.dto.ProductDto;
import mk.ukim.finki.vbs.web.model.enumerations.Type;
import mk.ukim.finki.vbs.web.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/products")
public class ProductRestController {

    private final ProductService productService;

    public ProductRestController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    private List<Product> findAllProducts() {
        return this.productService.findAll();
    }

    @GetMapping("/most-selling")
    private List<Product> findMostSelling() {
        return this.productService.findMostSellingProducts();
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        try {
            Product p = this.productService.findProduct(id);
            return ResponseEntity.ok().body(p);
        }
        catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/similar/{id}")
    public ResponseEntity<List<Product>> findSimilarProducts(@PathVariable Long id) {
        try {
            List<Product> products = this.productService.findSimilarProducts(id);
            return ResponseEntity.ok().body(products);
        }
        catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Product> save(@RequestBody ProductDto productDto) {
        return this.productService.addProduct(productDto)
                .map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.badRequest().build());

    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Product> save(@PathVariable Long id, @RequestBody ProductDto productDto) {
        return this.productService.updateProduct(id, productDto)
                .map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }



    @PostMapping("/delete/{id}")
    public ResponseEntity<Product> deleteById(@PathVariable Long id) {
        try {
            Product p = this.productService.deleteById(id);
            if (p != null)
                return ResponseEntity.ok().body(p);
            else return ResponseEntity.notFound().build();
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/types")
    public List<Type> findAllTypes() {
        return List.of(Type.values());
    }

    @GetMapping("/by-type")
    public List<Product> findProductsByType(@RequestBody Long typeId) {
        return this.productService.findAllByTypeLike(typeId);
    }
}
