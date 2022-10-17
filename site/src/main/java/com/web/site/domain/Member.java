package com.web.site.domain;

import jdk.jfr.Description;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;


@Getter @ToString @AllArgsConstructor @NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member extends AuditingFileds{

    @Id @Column(length = 50)
    @Description("아이디")
    private String userId;

    @Setter @Column(nullable = false)
    @Description("비밀번호")
    private String userPassword;

    @Setter @Column(nullable = false, length = 30)
    @Description("이름")
    private String name;
    
    @Setter @Column(length = 50)
    @Description("닉네임")
    private String nickname;

    @Setter @Column(nullable = false, length = 100)
    @Description("주소")
    private String address;

    @Setter @Column(nullable = false, length = 30)
    @Description("주민등록번호")
    private String ssn;

    @Setter @Column(nullable = false, length = 30)
    @Description("권한")
    private String authority;

    @Setter
    @Description("마지막 접속일")
    private LocalDateTime lastAccess;

    public Member of(String userId, String userPassword, String name, String nickname, String address, String ssn, String authority, LocalDateTime lastAccess) {
        return new Member(userId, userPassword, name, nickname, address, ssn, authority, lastAccess);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Member member = (Member) o;
        return userId.equals(member.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }
}
