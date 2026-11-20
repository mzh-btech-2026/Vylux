package org.example.backend.Category.Service;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.example.backend.Category.DTO.CategoryRequest;
import org.example.backend.Category.DTO.CategoryResponse;
import org.example.backend.Category.DTO.CategoryUpdateRequest;
import org.example.backend.Category.Entity.Category;
import org.example.backend.Category.Repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Map;

@Service
public class CategoryService {


    private final CategoryRepository categoryRepository;
    private final Cloudinary cloudinary;

    public CategoryService(CategoryRepository categoryRepository, Cloudinary cloudinary){

        this.categoryRepository=categoryRepository;
        this.cloudinary=cloudinary;
    }


    //------------------- map to response ---------------
    public CategoryResponse maptoresponse(Category category){

        CategoryResponse categoryResponse = new CategoryResponse();

        categoryResponse.setId(category.getId());
        categoryResponse.setCategoryImage(category.getCategoryImage());
        categoryResponse.setCategoryName(category.getCategoryName());
        categoryResponse.setCategoryPopular(category.getCategoryPopular());
        categoryResponse.setCategorySlug(category.getCategorySlug());
        categoryResponse.setCategoryStatus(category.getCategoryStatus());
        categoryResponse.setCreatedAt(category.getCreatedAt());
        categoryResponse.setUpdatedAt(category.getUpdatedAt());

        return categoryResponse;
    }

    //------------------ create a new category ------------------------

    public CategoryResponse createCategory(CategoryRequest categoryRequest){


        try {

            MultipartFile image = categoryRequest.getCategoryImage();

            if (image == null || image.isEmpty()) {
                throw new RuntimeException("Category image is required");
            }

            // Declare variables outside inner try
            String imageUrl;
            String publicId;

            try {

                Map uploadResult = cloudinary.uploader().upload(
                        image.getBytes(),
                        ObjectUtils.asMap(
                                "folders","category"
                        )
                );

                imageUrl = (String) uploadResult.get("secure_url");
                publicId = (String) uploadResult.get("public_id");

            } catch (IOException e) {

                throw new RuntimeException("Failed to upload banner image", e);

            }

            // Create entity
            Category category = new Category();

            category.setCategoryImage(imageUrl);
            category.setPublicId(publicId);
            category.setCategoryName(categoryRequest.getCategoryName());
            category.setCategorySlug(categoryRequest.getCategorySlug());
            category.setCategoryPopular(categoryRequest.getCategoryPopular());
            category.setCategoryStatus(categoryRequest.getCategoryStatus());
            // Save in database
            Category saveCategory = categoryRepository.save(category);

            // Return response
            return maptoresponse(saveCategory);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to create banner: " + e.getMessage(), e
            );
        }
    }

    // --------------- get all category ----------------------

    public Page<CategoryResponse> getAllCategory(int page,int size){

        Pageable pagable = PageRequest.of(page,size);

        Page<Category> categoryResponse = categoryRepository.findAll(pagable);

        return categoryResponse.map(this::maptoresponse);

    }


    //----------------- update the category ------------------------------

    public CategoryResponse updateCategory(Long id, CategoryUpdateRequest categoryUpdateRequest){

        Category category = categoryRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND,"user id not found"
                )
        );

        category.setCategoryName(categoryUpdateRequest.getCategoryName());
        category.setCategorySlug(categoryUpdateRequest.getCategorySlug());
        category.setCategoryStatus(categoryUpdateRequest.getCategoryStatus());
        category.setCategoryPopular(categoryUpdateRequest.getCategoryPopular());

        MultipartFile image = categoryUpdateRequest.getCategoryImage();

        if (image != null && !image.isEmpty()) {

            try {

                // Delete old image from Cloudinary
                if (category.getPublicId() != null) {

                    cloudinary.uploader().destroy(
                            category.getPublicId(),
                            ObjectUtils.emptyMap()
                    );
                }

                // Upload new image
                Map uploadResult = cloudinary.uploader().upload(
                        image.getBytes(),
                        ObjectUtils.asMap(
                                "folder", "category"
                        )
                );

                String imageUrl = (String) uploadResult.get("secure_url");
                String publicId = (String) uploadResult.get("public_id");

                // Update image details
                category.setCategoryImage(imageUrl);
                category.setPublicId(publicId);

            } catch (IOException e) {

                throw new RuntimeException(
                        "Failed to update banner image", e
                );
            }
        }

        // 4. Save updated banner
        Category updatedCategory = categoryRepository.save(category);

        // 5. Return response
        return maptoresponse(updatedCategory);



    }


    // ------------- delete a category ------------------
    public void deleteCategory(Long id){

        Category category = categoryRepository.findById(id).orElseThrow(
                ()-> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,"given id not found"
                )
        );

        try {

            // Delete image from Cloudinary
            Map result = cloudinary.uploader().destroy(
                    category.getPublicId(),
                    ObjectUtils.emptyMap()
            );

            System.out.println("Cloudinary delete result: " + result);

            // Delete banner from PostgreSQL
            categoryRepository.delete(category);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to delete image from Cloudinary", e
            );
        }
    }



}


