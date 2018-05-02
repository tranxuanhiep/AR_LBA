package com.ar_lba.model;

/**
 * Created by hanson on 24/04/2018.
 */

public class PromotionForRecycle {

    private String image;
    private String title;
    private String id;
    private int totalFavorite;
    private int totalComment;
    private String name;
    private String expiry;
    private String imageStore;


    public PromotionForRecycle(String id, String title, String image, int totalFavorite, int totalComment, String name, String expiry, String imageStore) {
        this.image = image;
        this.title = title;
        this.id = id;
        this.totalFavorite = totalFavorite;
        this.totalComment = totalComment;
        this.name=name;
        this.expiry=expiry;
        this.imageStore=imageStore;
    }
    public String getImageStore() {
        return imageStore;
    }

    public void setImageStore(String imageStore) {
        this.imageStore = imageStore;
    }
    public String getExpiry() {
        return expiry;
    }

    public void setExpiry(String expiry) {
        this.expiry = expiry;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getTotalFavorite() {
        return totalFavorite;
    }

    public void setTotalFavorite(int totalFavorite) {
        this.totalFavorite = totalFavorite;
    }

    public int getTotalComment() {
        return totalComment;
    }

    public void setTotalComment(int totalComment) {
        this.totalComment = totalComment;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
