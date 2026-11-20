
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
public class CategoryUpdateRequest {


    private MultipartFile categoryImage;

    private String categoryName;

    private String categorySlug;

    private Boolean categoryStatus = true;

    private Boolean categoryPopular = false;
}
