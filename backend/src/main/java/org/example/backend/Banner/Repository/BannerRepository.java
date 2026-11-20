package org.example.backend.Banner.Repository;

import org.example.backend.Banner.Entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepository extends JpaRepository<Banner,Long> {
}
