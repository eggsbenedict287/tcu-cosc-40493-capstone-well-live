package com.welllive.backend.auth;

import com.welllive.backend.domain.Member;
import com.welllive.backend.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MemberUserDetailsService implements UserDetailsService {
    private final MemberRepository members;

    public MemberUserDetailsService(MemberRepository members) {
        this.members = members;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        Member member = members.findByEmailIgnoreCase(username)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
        return new MemberPrincipal(member.getId(), member.getEmail(), member.getPasswordHash());
    }
}
