
package org.example.backend.Banner.DTO;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BannerRequest {


    @NotBlank(message = "Banner name is required")
    private String bannerName;

    @NotBlank(message = "URL is required")
    private String url;

    @NotNull(message = "Status is required")
    private Boolean status = true;

    @NotNull(message = "Banner image is required")
    private MultipartFile bannerImage;

}
