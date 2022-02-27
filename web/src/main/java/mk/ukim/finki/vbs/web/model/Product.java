package mk.ukim.finki.vbs.web.model;

import mk.ukim.finki.vbs.web.model.enumerations.Type;
import org.neo4j.ogm.annotation.NodeEntity;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;

@NodeEntity
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    private Type type;

    private String imageUrl;

    private String name;

    private Double price;

    private Integer quantity;

    private Integer sale;

    private Integer sold;

    public Product() {
    }

    public Product(Type type, String imageUrl, String name, Double price,
                   Integer quantity, Integer sale, Integer sold) {
        this.type = type;
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.sale = sale;
        this.sold = sold;
    }

    public Long getId() {
        return id;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getSale() {
        return sale;
    }

    public void setSale(Integer sale) {
        this.sale = sale;
    }

    public Integer getSold() {
        return sold;
    }

    public void setSold(Integer sold) {
        this.sold = sold;
    }
}
