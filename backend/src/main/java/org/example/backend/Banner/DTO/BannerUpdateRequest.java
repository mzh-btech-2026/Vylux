package org.example.backend.Banner.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BannerUpdateRequest {

    private String bannerName;


    private String url;


    private Boolean status = true;


    private MultipartFile bannerImage;
}
