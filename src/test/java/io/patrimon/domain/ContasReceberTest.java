package io.patrimon.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.patrimon.web.rest.TestUtil;

public class ContasReceberTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContasReceber.class);
        ContasReceber contasReceber1 = new ContasReceber();
        contasReceber1.setId(1L);
        ContasReceber contasReceber2 = new ContasReceber();
        contasReceber2.setId(contasReceber1.getId());
        assertThat(contasReceber1).isEqualTo(contasReceber2);
        contasReceber2.setId(2L);
        assertThat(contasReceber1).isNotEqualTo(contasReceber2);
        contasReceber1.setId(null);
        assertThat(contasReceber1).isNotEqualTo(contasReceber2);
    }
}
