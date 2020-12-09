package io.patrimon.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.patrimon.web.rest.TestUtil;

public class InvestimentoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Investimento.class);
        Investimento investimento1 = new Investimento();
        investimento1.setId(1L);
        Investimento investimento2 = new Investimento();
        investimento2.setId(investimento1.getId());
        assertThat(investimento1).isEqualTo(investimento2);
        investimento2.setId(2L);
        assertThat(investimento1).isNotEqualTo(investimento2);
        investimento1.setId(null);
        assertThat(investimento1).isNotEqualTo(investimento2);
    }
}
