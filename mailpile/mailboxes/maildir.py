import mailbox
import os
from gettext import gettext as _

import mailpile.mailboxes
from mailpile.mailboxes import UnorderedPicklable


class MailpileMailbox(UnorderedPicklable(mailbox.Maildir, editable=True)):
    """A Maildir class that supports pickling and a few mailpile specifics."""
    supported_platform = None

    @classmethod
    def parse_path(cls, config, fn, create=False):
        if (((cls.supported_platform is None) or
             (cls.supported_platform in system().lower())) and
                ((os.path.isdir(fn) and
                  os.path.exists(os.path.join(fn, 'cur'))) or
                 (create and not os.path.exists(fn)))):
            return (fn, )
        raise ValueError('Not a Maildir: %s' % fn)

    def _refresh(self):
        mailbox.Maildir._refresh(self)
        # Dotfiles are not mail. Ignore them.
        for t in [k for k in self._toc.keys() if k.startswith('.')]:
            del self._toc[t]


mailpile.mailboxes.register(25, MailpileMailbox)
