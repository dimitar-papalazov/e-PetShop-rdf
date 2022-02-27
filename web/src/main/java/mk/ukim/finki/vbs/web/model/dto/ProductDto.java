package mk.ukim.finki.vbs.web.model.dto;

public class ProductDto {

    private Long type;

    private String imageUrl;

    private String name;

    private Double price;

    private Integer quantity;

    private Integer sale;

    private Integer sold;


    public ProductDto() {
    }

    public ProductDto(Long type, String imageUrl, String name, Double price, Integer quantity, Integer sale) {
        this.type = type;
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.sale = sale;
        this.sold = 0;
    }

    public Long getType() {
        return type;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Integer getSale() {
        return sale;
    }

    public Integer getSold() {
        return sold;
    }
}
