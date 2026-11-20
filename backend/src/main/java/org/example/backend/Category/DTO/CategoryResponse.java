
package org.example.backend.Category.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {

    private Long id;

    private String categoryImage;

    private String categoryName;

    private String categorySlug;

    private Boolean categoryStatus;

    private Boolean categoryPopular;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
