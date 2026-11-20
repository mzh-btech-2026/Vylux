
package org.example.backend.Banner.DTO;

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


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "banner")
public class BannerResponse {


    private Long id;

    private String bannerName;

    private String url;

    private Boolean status ;

    private String bannerImage;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
