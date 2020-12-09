package io.patrimon.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.patrimon.web.rest.TestUtil;

public class ContasPagarTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContasPagar.class);
        ContasPagar contasPagar1 = new ContasPagar();
        contasPagar1.setId(1L);
        ContasPagar contasPagar2 = new ContasPagar();
        contasPagar2.setId(contasPagar1.getId());
        assertThat(contasPagar1).isEqualTo(contasPagar2);
        contasPagar2.setId(2L);
        assertThat(contasPagar1).isNotEqualTo(contasPagar2);
        contasPagar1.setId(null);
        assertThat(contasPagar1).isNotEqualTo(contasPagar2);
    }
}
