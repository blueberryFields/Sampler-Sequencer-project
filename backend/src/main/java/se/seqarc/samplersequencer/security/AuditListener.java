package se.seqarc.samplersequencer.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.boot.actuate.audit.listener.AuditApplicationEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

// TODO: Not working?!?!?

@Component
public class AuditListener {
    private static final Logger LOGGER = LoggerFactory.getLogger("Security");

    @EventListener
    public void onAuditEvent(AuditApplicationEvent event) {
        AuditEvent auditEvent = event.getAuditEvent();
        LOGGER.info("type={}, principal={}", auditEvent.getType(), auditEvent.getPrincipal());
    }
}
