package mk.ukim.finki.vbs.web.model;


import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;

import java.util.Date;
import java.util.List;


@NodeEntity
public class Order {

    @Id
    @GeneratedValue
    private Long id;

    private Date dateOrder;

    @Relationship(type="ORDERED_FROM", direction = Relationship.INCOMING)
    private Member member;

    private String phoneNumber;

    private String address;

    private String city;

    private String postalCode;

    private Boolean toDoor;

    private Long trackingNumber;

    @Relationship(type="ORDERED", direction=Relationship.INCOMING)
    private List<Product> products;

    public Order() {
    }

    public void setTrackingNumber(Long trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public Order(Member member, String phoneNumber, String address, String city, String postalCode, Boolean toDoor , List<Product> products){
        this.member=member;
        this.phoneNumber=phoneNumber;
        this.address=address;
        this.city=city;
        this.postalCode=postalCode;
        this.toDoor=toDoor;
        this.dateOrder = new Date();
        this.products = products;
    }

    public void setDateOrder(Date dateOrder) {
        this.dateOrder = dateOrder;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public void setToDoor(Boolean toDoor) {
        this.toDoor = toDoor;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public Date getDateOrder() {
        return dateOrder;
    }

    public Member getMember() {
        return member;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Long getTrackingNumber() {
        return trackingNumber;
    }

    public Boolean getToDoor() {
        return toDoor;
    }

    public List<Product> getProducts() {
        return products;
    }
}
