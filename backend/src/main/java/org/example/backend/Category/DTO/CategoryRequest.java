
package org.example.backend.Category.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {

    @NotNull(message = "Category image is required")
    private MultipartFile categoryImage;

    @NotBlank(message = "Category name is required")
    private String categoryName;

    @NotBlank(message = "Category slug is required")
    private String categorySlug;

    private Boolean categoryStatus = true;

    @NotNull(message = "Category popular is required")
    private Boolean categoryPopular = false;
}
