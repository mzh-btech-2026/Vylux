
package org.example.backend.Banner.Entity;

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
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "banner")
public class Banner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Banner name is required")
    @Column(name = "banner_name", nullable = false, unique = true)
    private String bannerName;

    @NotBlank(message = "URL is required")
    @Column(name = "url", nullable = false)
    private String url;

    @NotNull(message = "Status is required")
    @Column(name = "status", nullable = false)
    private Boolean status = true;

    @NotBlank(message = "Banner image is required")
    @Column(name = "banner_image", nullable = false)
    private String bannerImage;

    @NotBlank(message = "Public ID is required")
    @Column(name = "public_id", nullable = false)
    private String publicId;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
