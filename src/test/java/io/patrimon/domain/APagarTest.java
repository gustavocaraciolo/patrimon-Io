package io.patrimon.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.patrimon.web.rest.TestUtil;

public class APagarTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(APagar.class);
        APagar aPagar1 = new APagar();
        aPagar1.setId(1L);
        APagar aPagar2 = new APagar();
        aPagar2.setId(aPagar1.getId());
        assertThat(aPagar1).isEqualTo(aPagar2);
        aPagar2.setId(2L);
        assertThat(aPagar1).isNotEqualTo(aPagar2);
        aPagar1.setId(null);
        assertThat(aPagar1).isNotEqualTo(aPagar2);
    }
}
