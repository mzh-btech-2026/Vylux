
package org.example.backend.Category.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_image", nullable = false)
    @NotBlank(message = "Category image is required")
    private String categoryImage;

    @Column(name = "image_public_id", nullable = false)
    @NotBlank(message = "Category image is required")
    private String publicId;

    @Column(name = "category_name", nullable = false, unique = true)
    @NotBlank(message = "Category name is required")
    private String categoryName;

    @Column(name = "category_slug", nullable = false, unique = true)
    @NotBlank(message = "Category slug is required")
    private String categorySlug;

    @Column(name = "category_status", nullable = false)
    @NotNull(message = "Category status is required")
    private Boolean categoryStatus = true;

    @Column(name = "category_popular", nullable = false)
    @NotNull(message = "Category popular is required")
    private Boolean categoryPopular = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
