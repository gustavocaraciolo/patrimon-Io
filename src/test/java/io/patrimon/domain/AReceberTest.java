package io.patrimon.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.patrimon.web.rest.TestUtil;

public class AReceberTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AReceber.class);
        AReceber aReceber1 = new AReceber();
        aReceber1.setId(1L);
        AReceber aReceber2 = new AReceber();
        aReceber2.setId(aReceber1.getId());
        assertThat(aReceber1).isEqualTo(aReceber2);
        aReceber2.setId(2L);
        assertThat(aReceber1).isNotEqualTo(aReceber2);
        aReceber1.setId(null);
        assertThat(aReceber1).isNotEqualTo(aReceber2);
    }
}
